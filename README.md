<p align="right"><a href="https://nuid.io"><img src="https://nuid.io/svg/logo.svg" width="20%"></a></p>

# NuID :: `nuid-cli`

The `nuid-cli` provides an npm package at `@nuid/cli` with CLI interfaces to
NuID Open Core libraries like [`nuid.zk`](https://github.com/nuid/zk). We expect
the interface to grow over time, so all commands are organized with subcommands
to invoke the proper functions.

## Install

```sh
npm install @nuid/cli
# or
yarn add @nuid/cli
```

## Usage

Since argument finagling is problematic on the shell, we require that you
JSON-encode the argument vector for any given command you are invoking.

``` sh
# Or just install it globally with `npm i -g @nuid/cli`
export PATH=$PATH:./node_modules/.bin

# Print a list of top-level commands
nuid-cli --help

# Print a list of available sub-commands for zk
nuid-cli zk --help

# Returns a JSON-encoded verified credential
# Note the JSON-encoded argument vector
nuid-cli zk verifiableFromSecret '["my secret"]'
```

With this CLI available, you can now write full integration tests with NuID
crypto material in languages other than JavaScript or Clojure. For example,
in [Ruby](https://github.com/NuID/sdk-ruby/blob/5b7a7da3cf1c09f30661f41b7a191e2ed700c20e/test/nuid/api/auth_test.rb#L48-L56):

``` ruby
require "nuid-sdk"

class MyApiTest < ::Minitest::Test
  def test_credential_create
    api = ::NuID::SDK::API::Auth.new(ENV['NUID_API_KEY'])
    verified = zk('verifiableFromSecret', 'super secret password')
    res = api.credential_create(verified)
    assert_equal(201, res.code)
    nuid = res.parsed_response['nu/id']
    credential = res.parsed_response['nuid/credential']
    # ...
  end
  
  private
  
  def zk(command, *args)
    JSON.parse(%x{./node_modules/.bin/nuid-cli zk #{command} '#{args.to_json}'})
  end
end
```
