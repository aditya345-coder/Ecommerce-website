package com.ecommerce.shop.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.hibernate5.jakarta.Hibernate5JakartaModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

/**
 * Jackson configuration to handle Hibernate lazy-loading proxies
 */
@Configuration
public class JacksonConfig {
    
    @Bean
    public ObjectMapper objectMapper(Jackson2ObjectMapperBuilder builder) {
        ObjectMapper objectMapper = builder.createXmlMapper(false).build();
        
        // Register Hibernate5 module to handle lazy-loaded entities
        Hibernate5JakartaModule hibernate5Module = new Hibernate5JakartaModule();
        
        // Configure to force lazy loading of lazy-loaded properties
        // This prevents serialization of uninitialized proxies
        hibernate5Module.configure(Hibernate5JakartaModule.Feature.FORCE_LAZY_LOADING, false);
        
        // Serialize identifier for not-loaded lazy-loaded entities
        hibernate5Module.configure(Hibernate5JakartaModule.Feature.SERIALIZE_IDENTIFIER_FOR_LAZY_NOT_LOADED_OBJECTS, true);
        
        objectMapper.registerModule(hibernate5Module);
        
        return objectMapper;
    }
}

