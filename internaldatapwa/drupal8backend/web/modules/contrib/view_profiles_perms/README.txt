This module provides permissions to view user profiles depending on what
roles the profile requested to be viewed has.

INSTRUCTIONS:
Simply enable the module as usual, and go to admin/people/permissions to
configure the permissions under the 'View profiles permissions' section
Note that core's 'access user profiles' permission stil applies,
and will override any permission not set by this module.

USE CASE EXAMPLE:
If you want all users to only be able to access profiles of users with
the role 'blogger', uncheck 'access user profiles' and check
'access blogger profiles' for annonymous and authenticated users.
