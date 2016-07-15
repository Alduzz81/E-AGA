CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `v_lista_prodotti` AS
    SELECT 
        `eaga`.`prodotti`.`IdProdotto` AS `IdProdotto`,
        `eaga`.`prodotti`.`Nome` AS `Nome`,
        `eaga`.`prodotti`.`Prezzo` AS `Prezzo`,
        `eaga`.`prodotti`.`Quantita` AS `Quantita`,
        `eaga`.`prodotti`.`NumCategorie` AS `Num. di Categorie`,
        `eaga`.`prodotti`.`Descrizione` AS `Descrizione`,
        `immagini_prodotti`.`PathImmagine` AS `PathImmagine`
    FROM
        (`eaga`.`prodotti`
        JOIN (SELECT 
            `eaga`.`immagini_prodotti`.`IdProdotto` AS `IdProdotto`,
                MAX(`eaga`.`immagini_prodotti`.`PathImmagine`) AS `PathImmagine`
        FROM
            `eaga`.`immagini_prodotti`
        GROUP BY `eaga`.`immagini_prodotti`.`IdProdotto`) `immagini_prodotti` ON ((`eaga`.`prodotti`.`IdProdotto` = `immagini_prodotti`.`IdProdotto`)))