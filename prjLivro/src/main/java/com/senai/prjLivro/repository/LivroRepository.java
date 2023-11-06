package com.senai.prjLivro.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.senai.prjLivro.entities.Livro;

public interface LivroRepository extends JpaRepository<Livro, Long>{

}
