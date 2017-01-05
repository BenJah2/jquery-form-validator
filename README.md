# jquery-form-validator
Simple HTML forms validation plugin based on jQuery

## 1. Usage
  Form Example:
  ```html
    <form action="" id="form_id" novalidate>
        <div class="form-group">
            <input type="text" name="test" data-validate="full_name" data-title="Full Name" class="form-field">
            <div class="single-error"></div>
        </div>
        <div class="form-group">
            <input type="email" name="email" data-required="1" data-validate="email" data-title="Email" class="form-field">
            <div class="single-error"></div>
        </div>
        <div class="form-group">
            <input type="submit" value="Send">
        </div>
        <div id="progress"></div>
    </form>
  ```

  Basic Init (uses all default options):
  ```javascript
  $(document).ready(function(){
    $("#form_id").Validate();
  });
  ```

  Init with custom options:
  ```javascript
  $(document).ready(function(){
   validation_inputs_class : 'validate',
    valid : function(){
      return showThankyouPage();
    },
    invalid : function(response){
        var errors = "";
        for(var i in response){
            errors .= i + " - " +response[i];
        }
        $('#my_errors').text(errors);
        return false;
    }
  });
  ```


## 2. HTML data-attribut
| Name          | Description   |
| ------------- |:-------------:|
| data-title    | field display name |
| data-required | set to 1 if the field is required      |
| data-validate | the type of validation for the field   |
| data-custom-msg | custom error message for the field   |
| data-extensions | if the field is a file field - use this attribute to add allow file extansions (separate with comma)   |



## 3. Options
| Name          | Description   | Default value  |
| ------------- |:-------------:| -----:|
| validation_inputs_class      | form input elements class | form-field |
| use_single_errors      | append error to each field separately | true |
| single_error_element_class      | error class for single error (input and error container must be wrapped by the same element) | single-error |
| all_errors_element_id      | append all the errors to the same elemnt  | #progress |
| errors_class      | if field has error - Validator will add this class to the current field  | error |
| errors_separator  | The errors message seperator between the field name and the validation error | "-" |
| invalid_text  | error text for invalid field | "לא תקין" |
| require_text  | error text for required field | "שדה חובה" |
| password_to_short_text  | error text for short password | "מינימום 6 תווים" |
| weak_password_text  | error text for week password | "לא חזקה מספיק" |
| password_not_equal_text  | error text for non equal passwords | "לא זהה לסיסמא" |
| password_min_length  | password minimum length | 6 |
| check_password_strength  | set to false if you won't like to check password strength | true |
| send_if_valid  | if set to true Validator will return true anyway if the form is valid | true |
| handle_submit  | if set to false you should take care to the submit event of the form | true |
| valid  | callback function fires when the form is valid | null |
| invalid  | callback function fires when the form is invalid, returns the error messages as the parameter | null |
| auto_set_error_msg  | automaticly append error messages to elements | true |



## 4. Available Validation types
- string
- single_string (single word)
- number
- email
- phone
- name
- full_name
- user_name
- password
- same_password
- file
