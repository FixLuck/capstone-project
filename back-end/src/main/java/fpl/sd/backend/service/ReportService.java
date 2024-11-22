package fpl.sd.backend.service;

import fpl.sd.backend.dto.response.report.DailyRevenueReportDTO;
import fpl.sd.backend.dto.response.report.InventoryStatusDTO;
import fpl.sd.backend.dto.response.report.ProductPerformanceDTO;
import fpl.sd.backend.entity.report.DailyRevenueReport;
import fpl.sd.backend.entity.report.InventoryStatus;
import fpl.sd.backend.entity.report.ProductPerformance;
import fpl.sd.backend.repository.report.DailyRevenueReportRepository;
import fpl.sd.backend.repository.report.InventoryStatusRepository;
import fpl.sd.backend.repository.report.ProductPerformanceRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReportService {

    DailyRevenueReportRepository dailyRevenueReportRepository;
    ProductPerformanceRepository productPerformanceRepository;
    InventoryStatusRepository inventoryStatusRepository;

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





}
