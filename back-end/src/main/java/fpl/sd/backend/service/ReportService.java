package fpl.sd.backend.service;

import fpl.sd.backend.dto.response.report.*;
import fpl.sd.backend.entity.report.CustomerSegmentation;
import fpl.sd.backend.entity.report.DailyRevenueReport;
import fpl.sd.backend.entity.report.InventoryStatus;
import fpl.sd.backend.entity.report.ProductPerformance;
import fpl.sd.backend.repository.CustomerOrderRepository;
import fpl.sd.backend.repository.report.CustomerSegmentationRepository;
import fpl.sd.backend.repository.report.DailyRevenueReportRepository;
import fpl.sd.backend.repository.report.InventoryStatusRepository;
import fpl.sd.backend.repository.report.ProductPerformanceRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReportService {

    DailyRevenueReportRepository dailyRevenueReportRepository;
    ProductPerformanceRepository productPerformanceRepository;
    InventoryStatusRepository inventoryStatusRepository;
    CustomerSegmentationRepository customerSegmentationRepository;
    CustomerOrderRepository customerOrderRepository;

    public List<DailyRevenueReportDTO> getDailyRevenueReports() {
        List<DailyRevenueReport> reportDailies = dailyRevenueReportRepository.getDailyRevenueReport();

        return reportDailies.stream()
                .map(report -> {
                    DailyRevenueReportDTO reportDTO = new DailyRevenueReportDTO();
                    reportDTO.setTotalRevenue(report.getTotalRevenue());
                    reportDTO.setSaleDate(report.getSaleDate());
                    reportDTO.setTotalOrders(report.getTotalOrders());
                    reportDTO.setTotalDiscounts(report.getTotalDiscounts());
                    reportDTO.setAverageOrderValue(report.getAverageOrderValue());
                    return reportDTO;
                }).toList();
    }

    public List<ProductPerformanceDTO> getProductPerformances() {
        List<ProductPerformance> reportDailies = productPerformanceRepository.getProductPerformance();

        return reportDailies.stream()
                .map(product -> {
                    ProductPerformanceDTO productPerformanceDTO = new ProductPerformanceDTO();
                    productPerformanceDTO.setTotalOrders(product.getTotalOrders());
                    productPerformanceDTO.setTotalRevenue(product.getTotalRevenue());
                    productPerformanceDTO.setShoeName(product.getShoeName());
                    productPerformanceDTO.setTotalUnitsSold(product.getTotalUnitsSold());
                    productPerformanceDTO.setAverageSellingPrice(product.getAverageSellingPrice());
                    return productPerformanceDTO;
                }).toList();
    }

    public List<InventoryStatusDTO> getInventoryStatus() {
        List<InventoryStatus> inventoryStatuses = inventoryStatusRepository.getInventoryStatus();
        return inventoryStatuses.stream()
                .map(inventoryStatus -> {
                    InventoryStatusDTO inventoryStatusDTO = new InventoryStatusDTO();
                    inventoryStatusDTO.setShoeName(inventoryStatus.getShoeName());
                    inventoryStatusDTO.setSku(inventoryStatus.getSku());
                    inventoryStatusDTO.setSizeNumber(inventoryStatus.getSizeNumber());
                    inventoryStatusDTO.setCurrentStock(inventoryStatus.getCurrentStock());
                    inventoryStatusDTO.setStockStatus(inventoryStatus.getStockStatus());
                    return inventoryStatusDTO;
                }).toList();
    }

    public List<CustomerSegmentationDTO> getCustomerSegmentation() {
        List<CustomerSegmentation> customerSegmentations = customerSegmentationRepository.getCustomerSegmentation();
        return customerSegmentations.stream()
                .map(customerSegmentation -> {
                    CustomerSegmentationDTO customerSegmentationDTO = new CustomerSegmentationDTO();
                    customerSegmentationDTO.setCustomerId(customerSegmentation.getCustomerId());
                    customerSegmentationDTO.setFullName(customerSegmentation.getFullName());
                    customerSegmentationDTO.setTotalOrders(customerSegmentation.getTotalOrders());
                    customerSegmentationDTO.setTotalSpent(customerSegmentation.getTotalSpent());
                    customerSegmentationDTO.setLastOrderDate(customerSegmentation.getLastOrderDate());
                    customerSegmentationDTO.setCustomerLifetimeDays(customerSegmentation.getCustomerLifetimeDays());
                    return customerSegmentationDTO;
                }).toList();
    }

    public List<DailyTotalDTO> getDailyTotals(LocalDate startDate, LocalDate endDate) {
        Instant start = startDate != null
                ? startDate.atStartOfDay(ZoneId.systemDefault()).toInstant()
                : null;
        Instant end = endDate != null
                ? endDate.atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant()
                : null;

        // Validate dates if both are provided
        if (startDate != null && endDate != null && startDate.isAfter(endDate)) {
            throw new IllegalArgumentException("Start date must be before or equal to end date");
        }

        List<Object[]> results = customerOrderRepository.getDailyTotals(start, end);
        return results.stream()
                .map(result -> new DailyTotalDTO(
                        ((Date) result[0]).toLocalDate(),
                        ((Number) result[1]).doubleValue()
                ))
                .collect(Collectors.toList());
    }

    public List<MonthlyTotalDTO> getMonthlyTotals(int year) {
        List<Object[]> results = customerOrderRepository.getMonthlyTotals(year);
        return results.stream()
                .map(result -> new MonthlyTotalDTO(
                        ((Number) result[0]).intValue(),
                        ((Number) result[1]).intValue(),
                        ((Number) result[2]).doubleValue()
                ))
                .collect(Collectors.toList());
    }









}
