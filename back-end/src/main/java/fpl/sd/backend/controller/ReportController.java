package fpl.sd.backend.controller;

import fpl.sd.backend.dto.ApiResponse;
import fpl.sd.backend.dto.response.report.DailyRevenueReportDTO;
import fpl.sd.backend.dto.response.report.InventoryStatusDTO;
import fpl.sd.backend.dto.response.report.ProductPerformanceDTO;
import fpl.sd.backend.service.ReportService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@CrossOrigin(value = "*")
@RequestMapping("/report")
public class ReportController {
    ReportService reportService;

    @GetMapping("/daily-report")
    public ApiResponse<List<DailyRevenueReportDTO>> getDailyRevenueReport() {
        return ApiResponse.<List<DailyRevenueReportDTO>>builder()
                .flag(true)
                .message("OK")
                .result(reportService.getDailyRevenueReports())
                .build();
    }

    @GetMapping("/top-seller")
    public ApiResponse<List<ProductPerformanceDTO>> getProductPerformance() {
        return ApiResponse.<List<ProductPerformanceDTO>>builder()
                .flag(true)
                .message("OK")
                .result(reportService.getProductPerformances())
                .build();
    }

    @GetMapping("/inventory-status")
    public ApiResponse<List<InventoryStatusDTO>> getInventoryStatus() {
        return ApiResponse.<List<InventoryStatusDTO>>builder()
                .flag(true)
                .message("OK")
                .result(reportService.getInventoryStatus())
                .build();
    }
}
