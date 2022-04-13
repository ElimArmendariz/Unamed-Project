defmodule ApiWeb.Schema do
  use Absinthe.Schema

  alias ApiWeb.Schema

  import_types(Schema.Subject)
  import_types(Schema.Accounts)
  import_types(Schema.Content)



  query do
    import_fields(:get_courses)
    import_fields(:get_course)

    import_fields(:get_users)
    import_fields(:get_user)

    import_fields(:get_slides)
    import_fields(:get_slide)
  end

  mutation do
    import_fields(:create_course)
    import_fields(:update_course)
    import_fields(:delete_course)

    import_fields(:create_user)
    import_fields(:update_user)
    import_fields(:delete_user)

    import_fields(:create_slide)
    import_fields(:update_slide)
    import_fields(:delete_slide)
  end
end