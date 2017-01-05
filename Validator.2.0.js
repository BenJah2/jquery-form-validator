(function(window,$){



    var Validator = {


        defaults  : {
            validation_inputs_class 	 : "form-field",
            use_single_errors            : true,
            all_errors_element_id 	     : "#progress",
            single_error_element_class 	 : "single-error", //Append each field error message to specific element
            errors_class 	 			 : "error",
            errors_separator             : "-",
            invalid_text 	 			 : "לא תקין",
            require_text  	 			 : "שדה חובה",
            password_to_short_text		 : "מינימום 6 תווים",
            weak_password_text		     : "לא חזקה מספיק",
            password_not_equal_text 	 : "לא זהה לסיסמא",
            password_min_length 		 : 6,
            valid 						 : null,
            invalid 					 : null,
            auto_set_error_msg			 : true,
            check_password_strength 	 : true,
            remove_errors_on_focus		 : true,
            send_if_valid				 : true,
            handle_submit 				 : true
        },


        regex_patterns : {

            string :  /^[a-zA-Zא-ת0-9\.\!\@\s]*/,
            single_string : /^[a-zA-Zא-ת0-9\:\-\_\.\!\@\*\s]*/,
            email : /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/,
            phone : /^0\d([\d]{0,1})([-]{0,1})\d{7}$/,
            name : /^[a-zA-Zא-ת\-\_]{2,20}$/,
            full_name : /^[a-zA-Zא-ת\-\.\s]{2,20}\s[a-zA-Zא-ת\-\.\s]{2,20}$/,
            user_name : /^[a-zA-Zא-ת\-\.\s\@\_]{2,20}$/,


        },


        atts : {
            display_name : 'data-title',
            validation_type : 'data-validate',
            required : 'data-required',
            extensions : 'data-extensions',
            custom_error_msg : 'data-custom-msg',
        },


        errors_bag : {},


        original_password : null,


        form_id : null,


        init : function (opt)
        {
            var that = this;
            that.defaults = $.extend({} , that.defaults , opt);
            that.defaults.error_field = (that.defaults.all_errors_element_id.indexOf("#") >-1) ? that.defaults.all_errors_element_id : "#"+that.defaults.all_errors_element_id;
            that.defaults.all_inputs_class = (that.defaults.validation_inputs_class.indexOf(".") >-1) ? that.defaults.validation_inputs_class.substring(1) : that.defaults.validation_inputs_class;
            that.defaults.errors_class = (that.defaults.errors_class.indexOf(".") >-1) ? that.defaults.errors_class.substring(1) : that.defaults.errors_class;

            if(that.defaults.remove_errors_on_focus)
            {
                that.removeErrorsOnFocus();
            }

            if(that.defaults.handle_submit)
            {
                $(that.form_id).on("submit", function (e)
                {
                    e.preventDefault();
                    return that.validateForm();
                })
            }else{
                return that.validateForm();
            }
        },


        validateForm: function ()
        {
            var that = this;
            var rtn = false;
            var input_elements = $(that.form_id+" ."+that.defaults.validation_inputs_class);
            $(input_elements).each(function () {
                var current = $(this);
                var display_name = current.attr(that.atts.display_name);
                var validation_type = current.attr(that.atts.validation_type);
                if(that.isRequired(current) && that.isEmpty(current))
                {
                    that.addErrorToBag(current,display_name, that.defaults.require_text);
                }else{
                    var func_name = "is" + validation_type.charAt(0).toUpperCase() + validation_type.slice(1);
                    if(validation_type.indexOf("_") > -1)
                    {
                        validation_type = validation_type.split("_");
                        func_name = "is"+validation_type[0].charAt(0).toUpperCase() + validation_type[0].slice(1) +
                                        validation_type[1].charAt(0).toUpperCase() + validation_type[1].slice(1);
                    }
                    console.log(func_name);
                    that[func_name](current,display_name);
                }
            });

            if(!$.isEmptyObject(that.errors_bag))
            {
                return that.returnErrors();
            }

            if(typeof that.defaults.valid === 'function'){
                if(that.defaults.send_if_valid){
                    that.defaults.valid.call();
                    return true;
                }
                return that.defaults.valid.call();
            }
        },

        validateField : function (field_element, pattern)
        {
            var that= this;
            if(!that.isRequired(field_element) && field_element.val() == "")
            {
                return true;
            }
            return pattern.test(field_element.val());
        },



        isString : function (field_element,display_name)
        {
            var that = this;
            if(!that.validateField(field_element, that.regex_patterns.string))
            {
                return that.addErrorToBag( field_element, display_name,that.defaults.invalid_text);
            }
            return true;
        },


        isSingleString : function (field_element,display_name)
        {
            var that = this;
            if(!that.validateField(field_element, that.regex_patterns.single_string))
            {
                return that.addErrorToBag( field_element, display_name,that.defaults.invalid_text);
            }
            return true;
        },


        isNumber : function (field_element,display_name)
        {
            var that = this;
            if(!that.isRequired(field_element) && field_element.val() == "")
            {
                return true;
            }
            if(!$.isNumeric(field_element.val()))
            {
                that.addErrorToBag(display_name,that.defaults.invalid_text);
                return false;
            }
            return true;
        },


        isEmail : function (field_element,display_name)
        {
            var that = this;
            if(!that.validateField(field_element, that.regex_patterns.email))
            {
                return that.addErrorToBag( field_element, display_name,that.defaults.invalid_text);
            }
            return true;
        },


        isPhone : function (field_element,display_name)
        {
            var that = this;
            if(!that.validateField(field_element, that.regex_patterns.phone))
            {
                return that.addErrorToBag( field_element, display_name,that.defaults.invalid_text);
            }
            return true;
        },


        isName : function (field_element,display_name)
        {
            var that = this;
            if(!that.validateField(field_element, that.regex_patterns.name))
            {
                return that.addErrorToBag( field_element, display_name,that.defaults.invalid_text);
            }
            return true;
        },


        isFullName : function (field_element,display_name)
        {
            var that = this;
            if(!that.validateField(field_element, that.regex_patterns.full_name))
            {
                return that.addErrorToBag( field_element, display_name,that.defaults.invalid_text);
            }
            return true;
        },


        isUserName : function (field_element,display_name)
        {
            var that = this;
            if(!that.validateField(field_element, that.regex_patterns.user_name))
            {
                return that.addErrorToBag( field_element, display_name,that.defaults.invalid_text);
            }
            return true;
        },


        isPassword : function (field_element,display_name)
        {
            var that = this;
            var pattern = new RegExp("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\!\@\#\$\%\^\&\*\(\)\_\~\`\'\.]).{"+me.defaults.password_min_length+",}$");
            if(field_element.val().length < that.defaults.password_min_length)
            {
                return that.addErrorToBag( field_element, display_name,that.defaults.password_to_short_text);
            }

            if(that.defaults.check_password_strength && !pattern.test(field_element.val()))
            {
                return that.addErrorToBag( field_element, display_name,that.defaults.weak_password_text);
            }

            that.original_password = field_element.val();
            return true;
        },


        isSamePassword : function (field_element,display_name)
        {
            var that = this;
            if(field_element.val() != that.original_password)
            {
                return that.addErrorToBag( field_element, display_name,that.defaults.password_not_equal_text);
            }
            that.original_password = null;
            return true;
        },


        isFile : function (field_element,display_name)
        {
            var that = this;
            var is_valid = false;
            var file_extension = field_element.val().split('.').pop();
            var allow_extensions = field_element.attr(that.atts.extensions);
            allow_extensions = allow_extensions.split(',');

            for(var i = 0; i<allow_extensions.length; i++)
            {
                if(file_extension.toLowerCase() == allow_extensions[i].toLowerCase().trim())
                {
                    is_valid = true;
                }
            }

            if(!is_valid)
            {
                return that.addErrorToBag( field_element, display_name,that.defaults.invalid_text);
            }

            return true;
        },


        isRequired : function (field_element)
        {
            var that = this;
            return ((field_element.attr(that.atts.required) !== "undefined") && parseInt(field_element.attr(that.atts.required)) == 1);
        },


        isEmpty : function (field_element)
        {
            return field_element.val() == "";
        },


        removeErrorsOnFocus : function ()
        {
            var that = this;
            $("." + that.defaults.all_inputs_class).focus(function()
            {
                $(this).removeClass(that.defaults.errors_class);
                if(that.defaults.use_single_errors)
                {
                    $(this).parent().find($("." + that.defaults.single_error_element_class)).text("");
                }
            });
        },


        addErrorToBag : function (field_element,display_name,error_msg)
        {
            var that = this;
            that.errors_bag[display_name] = error_msg;
            if(that.defaults.auto_set_error_msg)
            {
                field_element.addClass(that.defaults.errors_class);
                if(that.defaults.use_single_errors)
                {
                    if(typeof field_element.attr(that.atts.custom_error_msg) !== "undefined")
                    {
                        error_msg = field_element.attr(that.atts.custom_error_msg);
                    }
                    field_element.parent().find($("."+that.defaults.single_error_element_class)).text(display_name + " " + that.defaults.errors_separator + " " + error_msg);
                }
            }
            return false;
        },


        returnErrors : function ()
        {
            var that = this;
            if(!that.defaults.use_single_errors)
            {
                $(that.defaults.all_errors_element_id).empty();
                for(var i in that.errors_bag)
                {
                    var error_elem = $("<span></span>").text(i + " " + that.defaults.errors_separator + " " + that.errors_bag[i]).class('single-error-span');
                    $(that.defaults.all_errors_element_id).append(error_elem);
                }
            }

            if(typeof that.defaults.invalid === 'function')
            {
                return that.defaults.invalid.call(that,that.errors_bag);
            }

            return false;
        }


    };


    $.fn.Validate = function(opt)
    {
        Validator.form_id = "#"+$(this).attr("id");
        return Validator.init(opt);
    }



})(window,jQuery,undefined);