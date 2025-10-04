package com.ecommerce.shop.cart.service;

import com.ecommerce.shop.cart.dto.CartItemDto;
import com.ecommerce.shop.cart.dto.CartViewDto;
import com.ecommerce.shop.cart.dto.ProductDto;
import com.ecommerce.shop.cart.entity.Cart;
import com.ecommerce.shop.cart.entity.CartItem;
import com.ecommerce.shop.cart.repository.CartItemRepository;
import com.ecommerce.shop.cart.repository.CartRepository;
import com.ecommerce.shop.products.entity.Product;
import com.ecommerce.shop.products.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    public CartService(CartRepository cartRepository,
                       CartItemRepository cartItemRepository,
                       ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
    }

    public CartViewDto getCartForUser(Long userId) {
        Cart cart = cartRepository.findByUserId(userId).orElseGet(() -> createCart(userId));
        return toView(cart);
    }

    public CartViewDto addItem(Long userId, Long productId, int quantity) {
        Cart cart = cartRepository.findByUserId(userId).orElseGet(() -> createCart(userId));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        CartItem item = new CartItem();
        item.setCart(cart);
        item.setProduct(product);
        item.setQuantity(quantity);
        item.setUnitPrice(product.getPrice());

        cart.getItems().add(item);
        cartRepository.save(cart);
        return toView(cart);
    }

    public CartViewDto updateQuantity(Long userId, Long itemId, int quantity) {
        Cart cart = cartRepository.findByUserId(userId).orElseThrow(() -> new IllegalArgumentException("Cart not found"));
        CartItem item = cart.getItems().stream()
                .filter(ci -> ci.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Item not found in cart"));
        item.setQuantity(quantity);
        cartRepository.save(cart);
        return toView(cart);
    }

    public CartViewDto removeItem(Long userId, Long itemId) {
        Cart cart = cartRepository.findByUserId(userId).orElseThrow(() -> new IllegalArgumentException("Cart not found"));
        cart.getItems().removeIf(ci -> ci.getId().equals(itemId));
        cartRepository.save(cart);
        return toView(cart);
    }

    private Cart createCart(Long userId) {
        Cart c = new Cart();
        c.setUserId(userId);
        return cartRepository.save(c);
    }

    private CartViewDto toView(Cart cart) {
        CartViewDto view = new CartViewDto();
        view.setCartId(cart.getId());
        List<CartItemDto> items = cart.getItems().stream().map(ci -> {
            CartItemDto dto = new CartItemDto();
            dto.setId(ci.getId());
            dto.setProductId(ci.getProduct().getId());
            dto.setProductName(ci.getProduct().getName());
            dto.setQuantity(ci.getQuantity());
            dto.setUnitPrice(ci.getUnitPrice());
            
            // Add product details
            ProductDto productDto = new ProductDto();
            productDto.setId(ci.getProduct().getId());
            productDto.setName(ci.getProduct().getName());
            productDto.setDescription(ci.getProduct().getDescription());
            productDto.setPrice(ci.getProduct().getPrice());
            productDto.setImageUrl(ci.getProduct().getImageUrl());
            productDto.setSku(ci.getProduct().getSku());
            productDto.setStock(ci.getProduct().getStock());
            dto.setProduct(productDto);
            
            return dto;
        }).collect(Collectors.toList());
        view.setItems(items);
        BigDecimal total = items.stream()
                .map(i -> i.getUnitPrice().multiply(BigDecimal.valueOf(i.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        view.setTotal(total);
        return view;
    }
}


