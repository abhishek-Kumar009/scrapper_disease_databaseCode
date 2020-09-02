-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema disease_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema disease_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `disease_db` ;
USE `disease_db` ;

-- -----------------------------------------------------
-- Table `disease_db`.`disease`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `disease_db`.`disease` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(100) NOT NULL,
  `condition` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `disease_db`.`synonyms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `disease_db`.`synonyms` (
  `disease_id` INT NOT NULL,
  `synonym` VARCHAR(255) NULL,
  UNIQUE INDEX `synonym_UNIQUE` (`synonym` ASC),
  INDEX `fk_synonyms_disease_idx` (`disease_id` ASC),
  CONSTRAINT `fk_synonyms_disease`
    FOREIGN KEY (`disease_id`)
    REFERENCES `disease_db`.`disease` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
