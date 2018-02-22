from behave import *

use_step_matcher("re")


@given("a user who is already a master")
def step_impl(context):
    pass


@when('app sends request to "api_edit_master" url with updating required data')
def step_impl(context):
    pass


@then("it should get response with update success status")
def step_impl(context):
    pass
