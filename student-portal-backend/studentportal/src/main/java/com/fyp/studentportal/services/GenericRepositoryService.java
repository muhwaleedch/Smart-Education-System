package com.fyp.studentportal.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.AbstractPersistable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.support.Repositories;
import org.springframework.stereotype.Service;
import org.springframework.web.context.WebApplicationContext;

@Service
public class GenericRepositoryService {
    private final Repositories repositories;
    private final WebApplicationContext webApplicationContext;

    @Autowired
    public GenericRepositoryService(WebApplicationContext webApplicationContext) {
        this.webApplicationContext = webApplicationContext;
        this.repositories = new Repositories(this.webApplicationContext);
    }

    public JpaRepository getRepository(AbstractPersistable entity) {
        return (JpaRepository) this.repositories.getRepositoryFor(entity.getClass()).get();
    }

    public Object save(AbstractPersistable entity) {
        return this.getRepository(entity).save(entity);
    }

    public Object findAll(AbstractPersistable entity) {
        return this.getRepository(entity).findAll();
    }

    public void delete(AbstractPersistable entity) {
        this.getRepository(entity).delete(entity);
    }
}
