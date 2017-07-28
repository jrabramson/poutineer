defmodule Poutineer.CurrentUserController do
  use Poutineer.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated, handler: Poutineer.SessionController

  def show(conn, _) do
    user = Guardian.Plug.current_resource(conn)

    conn
    |> put_status(:ok)
    |> render("show.json", user: user)
  end
end
