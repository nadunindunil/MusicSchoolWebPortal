/**
 * Created by NADUN on 1/9/2016.
 */

'use strict';

$('.modal').on('hidden.bs.modal', function(){
    $(this).find('form')[0].reset();
});

var resetForm1 = function(){

    document.getElementById("form1").reset();
};

