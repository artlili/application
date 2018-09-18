'use strict';
$(document).ready(function() {
    console.log('do something…')

    Select();

    // Menu
    $('.js-menu-toggle').on('click', function(){
      $(this).siblings('.js-menu').toggleClass('open');
    })

    $('.js-close-menu').on('click', function(){
      $(this).closest('.js-menu').toggleClass('open');
    })

    // Steps
    $('.step:first-child').addClass('active');

    // Selects
    function Select() {
      $('.js-select').on('click', function(){
        $(this).toggleClass('active');
      });

      $('.select_option li').on('click', function(){
        $('.select_option li').removeClass('active');

        var selectParent = $(this).closest('.select'),
            selectedText = $(this).text();

        $(this).addClass('active');
        selectParent.removeClass('active').find('input').val(selectedText);
        selectParent.find('select option').attr('value', selectedText).text(selectedText);

      });
    }

    // Click out
    $(document).click(function (e) {
      var container = $('.js-select.active');
      if (container.has(e.target).length === 0){
          container.removeClass('active');
      }
    })



    // Clear input
    $('body').on('click', '.js-clear', function(){
      var inputParent = $(this).parent('.form-input');
      inputParent.find('input').val('');
      inputParent.find('input').removeClass('error');


      $(this).hide()
    })

    //Add input
    //проверка на кол-во полей
    var i = 0;
    $('.js-add-input').on('click', function() {
      i++;
      $('.js-form-authors').append(
        '<div class="form-input">' +
        '<input class="input input_auto" type="text" id="articleAuthor_' + i + '" placeholder="ФИО автора статьи"/>' +
        '<span class="delete js-delete">&times;</span></div>');
    })

    //Delete input
    $('body').on('click', '.js-delete', function(){
      $(this).parent('.form-input').remove()
    })


    //Form validation

    function formValidate() {
//переменные
      var form = $('.js-form-validate'),
          journalCategory = form.find('#journalCategory'),
          articleName = form.find('#articleName'),
          contactName = form.find('#contactName'),
          contactMail = form.find('#contactMail'),
          articleAuthor = form.find('#articleAuthor'),
          articleAuthor = form.find('#articleAuthor'),
          personalData = form.find('#personalData'),
          btn = form.find('.next');


//проверяем поля
          function checkInput() {
            if(journalCategory.val() != ''
                && articleName.val() != ''
                && contactName.val() != ''
                && contactMail.val() != ''
                && articleAuthor.val() != ''
                && personalData.is(':checked')){
                  //alert('sdfsdf')
                  btn.removeClass('disabled')
                  return true
              } else {
                  btn.addClass('disabled')
                  return false
              }
          }


// пустые поля
        function emptyInput(item) {
          if(item.val().length < 2 && item.val() != '')
              item.addClass('error')
          else
              item.removeClass('error')
        }

//blur
          form.find('.required').on('blur', function(){
            emptyInput($(this))
            checkInput()
          })
//input

          personalData.on('change', function() {
            if($(this).is(':checked') && checkInput()) {
              btn.removeClass('disabled')
            } else{
              btn.addClass('disabled')
            }
          })
          // form.find('input').on('input', function() {
          //   if($(this).val() == '') $(this).removeClass('error')
          // })
//focus
          form.find('input').on('focus', function() {
              $(this).removeClass('error')
          })


// name validation
            function checkName(item) {
              var name = item.val(),
                  test = name.match(/^[a-zA-Zа-яёА-ЯЁ\s\-]{2,100}$/);
                  if(name.length > 0 && (test || []).length !== 1) {
                    item.addClass('error')
                  } else {
                    item.removeClass('error');
                  }
            }

            contactName.on('blur', function(){
              checkName($(this))
            })

            articleAuthor.on('blur', function(){
              checkName($(this))
            })
//email validation

          function validEmail(item) {
            var email = item.val(),
                test = email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
                if(email.length > 0 && (test || []).length !== 1) {
                  item.addClass('error')
                } else {
                  item.removeClass('error');
                }
          }

          contactMail.on('blur', function(){
            validEmail($(this))
          })
//Auto input

          contactName.on('blur', function(){
            var inputName = $(this).val();
            checkName($(this))
            if( articleAuthor.val() == '' ) {
              articleAuthor.val(inputName)
              $('.js-clear').show()
            }

            if(contactName.hasClass('error')
               && contactName.val() === articleAuthor.val()) {
              articleAuthor.addClass('error')

            }
          })

          articleAuthor.on('keyup', function() {
            if($(this).val().length > 0 && $(this).val() != '')
              $('.js-clear').show()
            else
              $('.js-clear').hide()
          })


//Next step
          btn.on('click', function() {

            var dataStep = $(this).attr('data-step')
            if(checkInput() == true) {
              $('.js-step').each(function(item) {
                var item = $(this).attr('data-step')

                  if(item === dataStep){

                    $(this).siblings('.js-step').removeClass('active');

                    $(this).addClass('active')
                    $(this).prev().addClass('completed')
                    console.log($(this).prev());
                  }
              })
            } else {
              return false
            }




            //nextStep = checkInput() ? form.hide() : false
          })

    }
    formValidate()
});



// && personalData.is(':checked')
// var dataStep = $(this).attr('data-step')
// if(checkInput() == true) {
//   $('.js-step').each(function(item) {
//     var item = $(this).attr('id')
//
//       if(item === dataStep){
//
//         $('.js-step').removeClass('active');
//
//         $(this).addClass('active')
//       }
//   })
// } else {
//   return false
// }
