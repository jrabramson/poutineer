defmodule Poutineer.PageController do
  use Poutineer.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
