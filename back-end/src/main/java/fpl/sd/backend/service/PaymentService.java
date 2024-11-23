package fpl.sd.backend.service;

import fpl.sd.backend.configuration.VNPayConfig;
import fpl.sd.backend.constant.OrderConstants;
import fpl.sd.backend.dto.request.PaymentCallbackRequest;
import fpl.sd.backend.dto.request.PaymentRequest;
import fpl.sd.backend.dto.response.PaymentResponse;
import fpl.sd.backend.entity.CustomerOrder;
import fpl.sd.backend.entity.PaymentDetail;
import fpl.sd.backend.exception.AppException;
import fpl.sd.backend.exception.ErrorCode;
import fpl.sd.backend.repository.PaymentDetailRepository;
import fpl.sd.backend.utils.VNPayUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Map;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentService {
    VNPayConfig vnPayConfig;
    OrderService orderService;
    PaymentValidationService validationService;
    PaymentDetailRepository paymentDetailRepository;

    public String createPayment(String orderId, String ipAddress) {
        try {
            CustomerOrder order = orderService.getOrderById(orderId);
            if (order == null) {
                throw new AppException(ErrorCode.ORDER_NOT_FOUND);
            }

            long amount = (long) (order.getFinalTotal() * 100L);

            Map<String, String> vnpParams = vnPayConfig.getVNPayConfig();
            vnpParams.put("vnp_Amount", String.valueOf(amount));
            vnpParams.put("vnp_OrderInfo", order.getId());
            vnpParams.put("vnp_IpAddr", ipAddress);

            String queryUrl = VNPayUtils.generateQueryUrl(vnpParams, true);
            String hashData =VNPayUtils.generateQueryUrl(vnpParams, false);
            String vnpSecureHash = VNPayUtils.hmacSHA512(vnPayConfig.getVnpHashSecret(), hashData);
            queryUrl += "&vnp_SecureHash=" + vnpSecureHash;
            return vnPayConfig.getVnpPayUrl() + "?" + queryUrl;
        } catch (AppException e) {
            throw new AppException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }


    @Transactional
    public PaymentResponse processPaymentCallback(PaymentCallbackRequest request) {

        if (paymentDetailRepository.existsByTransactionNo(request.getTransactionNo())) {
            PaymentDetail existingPayment = paymentDetailRepository.findByTransactionNo(request.getTransactionNo())
                    .orElseThrow(() -> new AppException(ErrorCode.PAYMENT_ALREADY_PROCESSED));

            return PaymentResponse.builder()
                    .paymentDetail(existingPayment)
                    .orderStatus(existingPayment.getOrder().getOrderStatus())
                    .build();
        }

        //validate payment signature
        validationService.validatePaymentSignature(request, vnPayConfig.getVnpHashSecret());

        //validate payment status
        boolean isSuccess = validationService.validatePaymentStatus(
                request.getResponseCode(),
                request.getTransactionStatus()
        );

        if (!isSuccess) {
            PaymentDetail failedPayment = creatPaymentDetail(request);
            CustomerOrder updatedOrder = orderService.updateStatus(
                    request.getOrderId(),
                    OrderConstants.OrderStatus.PAYMENT_FAILED,
                    failedPayment
            );

            failedPayment.setOrder(updatedOrder);
            paymentDetailRepository.save(failedPayment);
            throw new AppException(ErrorCode.INTERNAL_SERVER_ERROR);

        }

        //create payment details
        PaymentDetail paymentDetail = creatPaymentDetail(request);


        CustomerOrder updatedOrder = orderService.updateStatus(
                request.getOrderId(),
                OrderConstants.OrderStatus.PAID,
                paymentDetail
        );
        paymentDetail.setOrder(updatedOrder);
        paymentDetailRepository.save(paymentDetail);

        return PaymentResponse.builder()
                .paymentDetail(paymentDetail)
                .orderStatus(updatedOrder.getOrderStatus())
                .build();

    }

    private PaymentDetail creatPaymentDetail(PaymentCallbackRequest request) {
        return PaymentDetail.builder()
                .amount(request.getAmount() / 100)
                .bankCode(request.getBankCode())
                .transactionNo(request.getTransactionNo())
                .paymentDate(request.getPaymentDate())
                .cardType(request.getCardType())
                .build();
    }

}
