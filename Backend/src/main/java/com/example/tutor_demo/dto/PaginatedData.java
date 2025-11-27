package com.example.tutor_demo.dto;

import java.util.List;

public class PaginatedData<T> {

    private List<T> data;
    private int totalItems;
    private int currentPage;
    private int totalPages;
    private int pageSize;

    public PaginatedData() {}

    public PaginatedData(List<T> data, int totalItems, int currentPage, int totalPages, int pageSize) {
        this.data = data;
        this.totalItems = totalItems;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.pageSize = pageSize;
    }

    // Getters & Setters
    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    public int getTotalItems() {
        return totalItems;
    }

    public void setTotalItems(int totalItems) {
        this.totalItems = totalItems;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }
}

