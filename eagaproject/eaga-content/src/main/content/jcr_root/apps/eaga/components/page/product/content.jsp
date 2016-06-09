<%@include file="../../../global.jsp" %>
<%@page session="false"%>


<div class="col-sm-12 page-content">
	<div class="col-sm-4">
		<div class="col-sm-2">
			<div class="img-column-container">
				<img class="img-column-item" src="/etc/designs/EAGA-Design/images/large/alert-icon-red.png" />
				<img class="img-column-item" src="/etc/designs/EAGA-Design/images/large/facebook.gif" />
				<img class="img-column-item" src="/etc/designs/EAGA-Design/images/large/twitter.gif" />
				<img class="img-column-item" src="/etc/designs/EAGA-Design/images/large/mobile.gif" />
			</div>
		</div>
		<div class="col-sm-10 img-column">
			<img class="front-img" src="" data-zoom-image="" />
		</div>
	</div>
	<div class="col-sm-5">
		<div class="product-container">
			<h2 class="col-sm-12">Nome del prodotto</h2>
			<p class="trade-mark">marca</p>
			<hr>
			<p>Disponibilitą immediata</p>
			<div class="col-sm-12 ">Descrizione breve</div>
		</div>
	</div>
	<div class="col-sm-3 ">
		<div class="cart-container">
			<div class="col-sm-12">
				<div class="quantity">
					<label class="quantity-label" >Quantitą:</label>
					<select class="quantity-select">
							<option selected>1</option>
							<option>2</option>
							<option>3</option>
					</select>
				</div>
			</div>
			<input class="cart-input" type="submit" name="submit" value="Aggiungi al carrello"/>
			<input class="wishlist-input" type="submit" name="wishlist" value="Aggiungi alla lista dei desideri" />
		</div>
	</div>
	<div class="col-sm-12">
		<div class="details-container">
			<hr>
			qui la descrizione estesa
		</div>
	</div>
	<div class="col-sm-12">
		<cq:include path="par" resourceType="foundation/components/parsys"/>
	</div>
	
</div>
