<%@include file="../../../global.jsp" %>
<%@page session="false"%>

<div class="col-sm-12 page-content">
	<div class="col-sm-5">
		<div class="col-sm-2 img-column-container">
			<img class="img-column-item" src="/etc/designs/EAGA-Design/images/icons/alert-icon-red.png" />
			<img class="img-column-item" src="/etc/designs/EAGA-Design/images/icons/facebook.gif" />
			<img class="img-column-item" src="/etc/designs/EAGA-Design/images/icons/twitter.gif" />
			<img class="img-column-item" src="/etc/designs/EAGA-Design/images/icons/mobile.gif" />
		</div>
		<div class="col-sm-10 img-column">
			<img src="/etc/designs/EAGA-Design/images/icons/alert-icon-red.png" />
		</div>
	</div>
	<div class="col-sm-5">
		<h2 class="col-sm-12">Nome del prodotto</h2>
		<p>marca</p>
		<hr>
		<p>Disponibilità immediata</p>
		<div class="col-sm-12 prova">Descrizione breve</div>
	</div>
	<div class="col-sm-2">
		<div class="col-sm-12">
			Quantità:
			<select>
					<option selected>1</option>
					<option>2</option>
					<option>3</option>
			</select>
			<input type="submit" name="submit" value="Aggiungi al carrello"/>
			<input type="submit" name="wishlist" value="Aggiungi alla lista dei desideri" />
		</div>
	</div>
	<div class="col-sm-12">qui la descrizione estesa</div>
	<div class="col-sm-12">
		<cq:include path="par" resourceType="foundation/components/parsys"/>
	</div>
	
</div>
