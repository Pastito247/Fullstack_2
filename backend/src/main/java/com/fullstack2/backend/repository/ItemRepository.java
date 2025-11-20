package com.fullstack2.backend.repository;

import com.fullstack2.backend.entity.Item;
import com.fullstack2.backend.entity.ItemSource;
import com.fullstack2.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {

    Optional<Item> findByDnd5eIndex(String dnd5eIndex);

    List<Item> findBySource(ItemSource source);

    List<Item> findByCreatedBy(User createdBy);
}
