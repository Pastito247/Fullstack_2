package com.fullstack2.backend.service;

import com.fullstack2.backend.dto.ShopItemRequest;
import com.fullstack2.backend.entity.Item;
import com.fullstack2.backend.entity.Shop;
import com.fullstack2.backend.entity.ShopItem;
import com.fullstack2.backend.repository.ItemRepository;
import com.fullstack2.backend.repository.ShopItemRepository;
import com.fullstack2.backend.repository.ShopRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ShopItemService {

    private final ShopItemRepository shopItemRepository;
    private final ShopRepository shopRepository;
    private final ItemRepository itemRepository;

    public ShopItemService(ShopItemRepository shopItemRepository,
                           ShopRepository shopRepository,
                           ItemRepository itemRepository) {
        this.shopItemRepository = shopItemRepository;
        this.shopRepository = shopRepository;
        this.itemRepository = itemRepository;
    }

    public List<ShopItem> getItemsByShop(Long shopId) {
        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tienda no encontrada"));

        return shopItemRepository.findByShop(shop);
    }

    public ShopItem addItemToShop(Long shopId, ShopItemRequest request) {
        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tienda no encontrada"));

        Item item = itemRepository.findById(request.getItemId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item no encontrado"));

        ShopItem shopItem = ShopItem.builder()
                .shop(shop)
                .item(item)
                .stock(request.getStock())
                .priceOverrideGold(request.getPriceOverrideGold())
                .build();

        return shopItemRepository.save(shopItem);
    }

    public ShopItem updateShopItem(Long shopItemId, ShopItemRequest request) {
        ShopItem existing = shopItemRepository.findById(shopItemId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "ShopItem no encontrado"));

        existing.setStock(request.getStock());
        existing.setPriceOverrideGold(request.getPriceOverrideGold());

        // Si quisieras permitir cambiar el item:
        if (request.getItemId() != null) {
            Item item = itemRepository.findById(request.getItemId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item no encontrado"));
            existing.setItem(item);
        }

        return shopItemRepository.save(existing);
    }

    public void removeShopItem(Long shopItemId) {
        ShopItem existing = shopItemRepository.findById(shopItemId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "ShopItem no encontrado"));
        shopItemRepository.delete(existing);
    }
}
