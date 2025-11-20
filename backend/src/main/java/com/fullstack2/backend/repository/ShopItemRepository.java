package com.fullstack2.backend.repository;

import com.fullstack2.backend.entity.Shop;
import com.fullstack2.backend.entity.ShopItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShopItemRepository extends JpaRepository<ShopItem, Long> {

    List<ShopItem> findByShop(Shop shop);
}
