defmodule Poutineer.CurrentUserView do
  use Poutineer.Web, :view

  def render("show.json", %{user: user}) do
    user
  end

  def render("error.json", _) do
  end
end
