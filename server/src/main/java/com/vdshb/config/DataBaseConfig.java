package com.vdshb.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import liquibase.integration.spring.SpringLiquibase;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class DataBaseConfig {

    @Value("${spring.datasource.url}")
    String url;
    @Value("${spring.datasource.username}")
    String user;
    @Value("${spring.datasource.password}")
    String pass;
    @Value("${spring.datasource.driver-class-name}")
    String driver;

    @Bean
    public SpringLiquibase liquibase() {
        SpringLiquibase liquibase = new SpringLiquibase();
        liquibase.setChangeLog("classpath:liquibase/master.xml");
        liquibase.setDataSource(dataSource());
        return liquibase;
    }

    @Bean
    public DataSource dataSource() {
        final HikariConfig config = new HikariConfig();
        config.setJdbcUrl(url);
        config.setDriverClassName(driver);
        config.setUsername(user);
        config.setPassword(pass);
        return new HikariDataSource(config);
    }
}
