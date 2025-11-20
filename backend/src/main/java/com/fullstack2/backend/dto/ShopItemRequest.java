package com.fullstack2.backend.dto;

import lombok.Data;

@Data
public class ShopItemRequest {
    private Long itemId;
    private int stock;
    private int priceOverrideGold;
}
