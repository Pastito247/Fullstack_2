package com.fullstack2.backend.controller;

import com.fullstack2.backend.dto.ShopRequest;
import com.fullstack2.backend.entity.Shop;
import com.fullstack2.backend.service.ShopService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/shops")
@CrossOrigin(origins = "*")
public class ShopController {

    private final ShopService shopService;

    public ShopController(ShopService shopService) {
        this.shopService = shopService;
    }

    // GET /api/shops
    @GetMapping
    public List<Shop> getAllShops() {
        return shopService.getAllShops();
    }

    // GET /api/shops/{id}
    @GetMapping("/{id}")
    public Shop getShopById(@PathVariable Long id) {
        return shopService.getShopById(id);
    }

    // GET /api/shops/by-campaign/{campaignId}
    @GetMapping("/by-campaign/{campaignId}")
    public List<Shop> getShopsByCampaign(@PathVariable Long campaignId) {
        return shopService.getShopsByCampaign(campaignId);
    }

    // POST /api/shops
    @PostMapping
    public ResponseEntity<Shop> createShop(@RequestBody ShopRequest request) {
        Shop created = shopService.createShop(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // PUT /api/shops/{id}
    @PutMapping("/{id}")
    public Shop updateShop(@PathVariable Long id, @RequestBody ShopRequest request) {
        return shopService.updateShop(id, request);
    }

    // DELETE /api/shops/{id}
    @PreAuthorize("hasRole('DM') or hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShop(@PathVariable Long id) {
        shopService.deleteShop(id);
        return ResponseEntity.noContent().build();
    }
}
