(function readyJS(win,doc){
    'use strict';

    var deletar =doc.querySelectorAll('.deletar');

    if(deletar)
    {
        for(let i=0; i < deletar.length; i++) 
        {
            deletar[i].addEventListener('click',function(event){
                if(confirm("Confirmar a Exclusão!")) 
                {
                    return true;
                } else {
                    event.preventDefault();
                }
            });
        }

    }

})(window, document);