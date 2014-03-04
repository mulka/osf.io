<%inherit file="base.mako"/>
<%def name="title()">Claim Account</%def>
<%def name="content()">
<h1 class="page-header text-center">Set Password</h1>

<div class="row">
    ## Center the form
    <div class="col-md-6 col-md-offset-3">
    <p>Hello ${firstname}! Welcome to the Open Science Framework. Please set a password to claim your account.</p>

        <form method="POST" id='setPasswordForm' role='form'>
            <div class='form-group'>
                ${form.username.label}
                ${form.username(value=email)}
            </div>
            <div class='form-group'>
                ${form.password(placeholder='New password', autofocus=True)}
            </div>
            <div class='form-group'>
                ${form.password2(placeholder='New password again')}
            </div>
            ${form.token}
            %if next_url:
                <input type='hidden' name='next_url' value='${next_url}'>
            %endif
            <button type='submit' class="btn btn-submit btn-primary pull-right">Submit</button>
        </form>

        <div class='help-block'>
            <p>If you are not ${fullname}, please contact <a href="mailto:contact@centerforopenscience.org">contact@centerforopenscience.org</a>
            </p>
        </div>
    </div>
</div>
</%def>

