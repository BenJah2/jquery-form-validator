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

  Basic Init (uses all default options)
  ```javascript
  $(document).ready(function(){
    $("#form_id").Validate();
  });
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
  Init with custom options
  ```javascript
  $(document).ready(function(){
   validation_inputs_class : 'validate',
    valid : function(){
      return showThankyouPage();
    },
    invalid : function(){
      return false;
    }
  });
  ```
  
  ## 2. Options
  | Name | Description | Default Value | Example Usage
  | validation_inputs_class | form-field | 
