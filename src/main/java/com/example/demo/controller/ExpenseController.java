package com.example.demo.controller;

import com.example.demo.model.Expense;
import com.example.demo.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
// @CrossOrigin(origins = "http://localhost:5173") 
@CrossOrigin(origins = "*")

public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @PostMapping("/add")
    public ResponseEntity<String> addExpense(@RequestBody Expense expense) {
        try {
            expenseService.addExpense(expense);
            return ResponseEntity.ok("Expense added successfully.   ");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Validation Error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error adding expense.");
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Expense>> getAllExpenses() {
        List<Expense> expenses = expenseService.getAllExpenses();
        return ResponseEntity.ok(expenses);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteExpense(@PathVariable Long id) {
        try {
            expenseService.deleteExpense(id);
            return ResponseEntity.ok("Expense deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error deleting expense.");
        }
    }

    @PutMapping("/update/{id}")
public ResponseEntity<String> updateExpense(@PathVariable Long id, @RequestBody Expense expense) {
    try {
        expenseService.updateExpense(id, expense);
        return ResponseEntity.ok("Expense updated successfully.");
    } catch (Exception e) {
        return ResponseEntity.internalServerError().body("Error updating expense.");
    }
}
}
