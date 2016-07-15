CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `v_lista_prodotti_search` AS
    SELECT 
        `prod`.`IdProdotto` AS `IdProdotto`,
        `prod`.`Nome` AS `Nome`,
        `prod`.`Descrizione` AS `Descrizione`,
        `prod`.`Prezzo` AS `Prezzo`,
        `prod`.`Quantita` AS `Quantita`,
        `prod`.`PathImmagine` AS `PathImmagine`,
        `c`.`IdCategoria` AS `IdCategoria`
    FROM
        ((`eaga`.`v_lista_prodotti` `prod`
        LEFT JOIN `eaga`.`prodotti_categorie` `pc` ON ((`pc`.`FK_Prodotti` = `prod`.`IdProdotto`)))
        LEFT JOIN `eaga`.`categorie` `c` ON ((`c`.`IdCategoria` = `pc`.`FK_Categorie`)))