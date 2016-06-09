/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

if(!CQ_Analytics.CartHelper) {
    CQ_Analytics.CartHelper = (function() {
        return {

            containsProduct: function(data, product, quantity) {
                var productPagePath = product ? product.substring(0, product.lastIndexOf("#")) : null;
                for (var i = 0; data.entries && i < data.entries.length; i++) {
                    var entry = data.entries[i];
                    var entryPagePath = entry.page.substring(0, entry.page.lastIndexOf("#"));
                    if ((!product || entryPagePath == productPagePath) && (!quantity || entry.quantity >= quantity)) {
                        return true;
                    }
                }
                return false;
            },

            containsPromotion: function(data, promotion, status, operator) {
                if (!promotion)
                    return false;

                if (!status)
                    return false;

                if (!operator)
                    return false;

                function mainPart(s) {
                    if(s) {
                        var i = s.lastIndexOf("#");
                        if (i > -1) {
                            s = s.substring(0, i);
                        }
                    }
                    return s;
                }

                function promotionInCart(data, promotion, status){
                    var promotionPath = mainPart(promotion);
                    var promotions = data.promotions;
                    for (var i = 0; promotions && i < promotions.length; i++) {
                        var cartPromotion = promotions[i];
                        var entryPath = mainPart(cartPromotion.path);
                        if (entryPath == promotionPath && status == cartPromotion.status) {
                            return true;
                        }
                    }
                    return false;
                }

                if (operator == "contains") {
                    return promotionInCart(data, promotion, status);
                } else if (operator == "notcontains") {
                    return !promotionInCart(data, promotion, status);
                } else {
                    return false;
                }
            }
        };
    })();
}
