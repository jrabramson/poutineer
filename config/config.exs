# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :poutineer,
  namespace: Poutineer,
  ecto_repos: [Poutineer.Repo]

# Configures the endpoint
config :poutineer, Poutineer.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "g0lkSO2aBym03Gfo0AnRI+mHE0mCzlrmhyY6/rq1FhuSQ+ogGCPG9cA405u2m25R",
  render_errors: [view: Poutineer.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Poutineer.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

config :phoenix, :generators,
  migration: true,
  binary_id: false

# Configure guardian
config :guardian, Guardian,
  issuer: "Poutineer",
  ttl: { 3, :days },
  verify_issuer: true,
  serializer: Poutineer.GuardianSerializer

# Start Hound for PhantomJs
config :hound, driver: "chrome_driver"
