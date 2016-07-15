CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `v_lista_categorie_prodotto` AS
    SELECT 
        `cat`.`Nome` AS `Nome`, `prod`.`FK_Prodotti` AS `IdProdotto`
    FROM
        (`categorie` `cat`
        JOIN `prodotti_categorie` `prod`)
    WHERE
        (`prod`.`FK_Categorie` = `cat`.`IdCategoria`)