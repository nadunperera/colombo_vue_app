# CERTAIN SECTION

- UserStatus Model in User Service?
- Looks like this needs to be in the UserModel, so we can filter users with their status
-- Add below fiels to the User Model
--- status
----- staff
----- new_client
----- in_progress
----- delayed_progress
----- service_not_suitable
----- idle

- How about a Meeting Service
-- Meeting Model
--- user
--- meeting_type
----- initial_contact
----- first_meeting
----- second_meeting
----- eoi_related
----- other
--- meeting_outcome
----- success
----- failed
----- neutral
--- notes
--- created_at
--- updated_at

- Needs to have a Follow Up Service where Colombo reminds particular users about upcoming activities
- This needs to be a part of the Meeting Service. A Follow Up Model
-- FollowUp Model
--- user
--- follow_up_date
--- description

# UNCERTAIN SECTION

- May be we need seperate models for all 3 connection types
- UserConnection Model
--- user_child
--- user_master
--- connection_type
----- referrer
----- business_partner
----- partner
--- created_at
--- updated_at

- EOI Model
--- user
----- property
----- lot
----- sales_agent
----- second_sales_agent
