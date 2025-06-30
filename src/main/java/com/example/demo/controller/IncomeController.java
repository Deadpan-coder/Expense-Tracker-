package com.example.demo.controller;

import com.example.demo.model.Income;
import com.example.demo.service.IncomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/incomes")
// @CrossOrigin(origins = "http://localhost:5173") // Allow React frontend to connect
@CrossOrigin(origins = "*")

public class IncomeController {

    @Autowired
    private IncomeService incomeService;

    // ✅ Create income
    @PostMapping("/add")
    public ResponseEntity<String> addIncome(@RequestBody Income income) {
        try {
            incomeService.addIncome(income);
            return ResponseEntity.ok("Income added successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Validation Error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error adding income.");
        }
    }

    // ✅ Get all incomes
    @GetMapping("/all")
    public ResponseEntity<List<Income>> getAllIncomes() {
        List<Income> incomes = incomeService.getAllIncomes();
        return ResponseEntity.ok(incomes);
    }

    // ✅ Delete income by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteIncome(@PathVariable Long id) {
        try {
            incomeService.deleteIncome(id);
            return ResponseEntity.ok("Income deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error deleting income.");
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateIncome(@PathVariable Long id, @RequestBody Income income) {
    try {
        incomeService.updateIncome(id, income);
        return ResponseEntity.ok("Income updated successfully.");
    } catch (Exception e) {
        return ResponseEntity.internalServerError().body("Error updating income.");
    }
}
 
}
