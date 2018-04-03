
$(function(){
  
  $(".dropdown-menu a").click(function(){
    $(".btn:first-child").text($(this).text());
    $(".btn:first-child").val($(this));
    $('.dropdown-menu a.selected').each(function(i, obj) {
      $(this).removeClass('selected')
    });
    $(this).addClass('selected')
 });

 $("#checkout").click(function() {
   var data = {
     cust_id: '',
     cart_items: {}
   }

   $('.dropdown-menu a.selected').each(function(i, obj) {
      data.cust_id = $(this).attr('id')
      return;
   });
   var itemAdded;
   $('.cart-item').each(function(i, obj) {
    var qty = parseInt($(this).val());
     if (!$.isNumeric(qty)) return;

     if (qty <= 0) return;
     itemAdded = true
     data.cart_items[$(this).attr("id")] = qty
    });

    if (!itemAdded) {
      $('#modal-body').html(`
        <div class="alert alert-info" role="alert">
          <strong>Opps</strong> You seems forgot to enter the job ads quantity. :)
        </div>     
      `);
      $('#checkout-modal').modal("show");
      return
    }

    $.ajax({
      type: "POST",
      url: '/cart/checkout',
      data: JSON.stringify(data),
      contentType: "application/json",
      success: showCheckoutDetails
    });
  });

  showCheckoutDetails = function(res) {
  
    var result = `<table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">sku</th>
          <th scope="col">name</th>
          <th scope="col" class="text-right">price</th>
        </tr>
      </thead>
      <tbody>`;

    var cartItems = res.cartItems;
    var i = 1
    cartItems.forEach(function(cartItem) {
      result = result + `
      <tr>
        <th scope="row">${i++}</th>
        <td>${cartItem.sku}</td>
        <td>${cartItem.name}</td>
        <td class="text-right">${cartItem.price}</td>
      </tr>`;
    }, this);
    result = result + `
      <tr class="table-success">
      <th scope="row" class="font-weight-bold text-uppercase" colspan=3>total</th>
      <td class="font-weight-bold text-right">${res.total}</td>
      </tr>
    </body>
    </table>`;

  $('#modal-body').html(result);
    

    $('#checkout-modal').modal("show");
  }
});
