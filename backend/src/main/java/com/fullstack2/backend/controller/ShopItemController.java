package com.fullstack2.backend.controller;

import com.fullstack2.backend.dto.ShopItemRequest;
import com.fullstack2.backend.entity.ShopItem;
import com.fullstack2.backend.service.ShopItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/shops")
@CrossOrigin(origins = "*")
public class ShopItemController {

    private final ShopItemService shopItemService;

    public ShopItemController(ShopItemService shopItemService) {
        this.shopItemService = shopItemService;
    }

    // GET /api/shops/{shopId}/items
    @GetMapping("/{shopId}/items")
    public List<ShopItem> getItemsByShop(@PathVariable Long shopId) {
        return shopItemService.getItemsByShop(shopId);
    }

    // POST /api/shops/{shopId}/items
    @PostMapping("/{shopId}/items")
    public ResponseEntity<ShopItem> addItemToShop(@PathVariable Long shopId,
                                                  @RequestBody ShopItemRequest request) {
        ShopItem created = shopItemService.addItemToShop(shopId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // PUT /api/shops/items/{shopItemId}
    @PutMapping("/items/{shopItemId}")
    public ShopItem updateShopItem(@PathVariable Long shopItemId,
                                   @RequestBody ShopItemRequest request) {
        return shopItemService.updateShopItem(shopItemId, request);
    }

    // DELETE /api/shops/items/{shopItemId}
    @DeleteMapping("/items/{shopItemId}")
    public ResponseEntity<Void> deleteShopItem(@PathVariable Long shopItemId) {
        shopItemService.removeShopItem(shopItemId);
        return ResponseEntity.noContent().build();
    }
}
