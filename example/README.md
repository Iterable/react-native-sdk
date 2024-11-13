This is the Iterable React Native Example App, bootstrapped using
[`@react-native-community/cli`](https://github.com/react-native-community/cli).

Use this to understand how you can use Iterables React Native SDK in your own
React Native application.

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment
>Setup](https://reactnative.dev/docs/set-up-your-environment) instructions till
>"Creating a new application" step, before proceeding.

## Step 1: Install dependencies
To install the app dependencies, run the following command from the
_example app directory_ (the directory in which this document resides):

```bash
yarn start
```

Once this is done, you will need to install the pods in the _ios_ folder in the
_example app directory_.  To do so, run the following:

```bash
cd ios
pod install
```

Once this is done, `cd` back into the _example app directory_:

```bash
cd ..
```

## Step 2: Add your environment variables
In the _example app directory_, there is a file called **.env.example**.  Make a
copy of this file, name it **.env** and place it in the exampe app directory.

In it, you will find:

```shell
ITBL_API_KEY=replace_this_with_your_iterable_api_key
ITBL_ID=replace_this_with_your_user_id_or_email
```

Replace `replace_this_with_your_iterable_api_key` with your _mobile_ Iterable API key,
and replace `replace_this_with_your_user_id_or_email` with the email or user id
that you use to log into Iterable.

Follow the steps below if you do not have a mobile Iterable API key.

### Adding an API Key
To add an API key, do the following:
 1. Sign into your Iterable account
 2. Go to [Integrations > API Keys](https://app.iterable.com/settings/apiKeys)
 3. Click "New API Key" in the top right corner
 4. Fill in the followsing fields:
    - Name: A descriptive name for the API key
    - Type: Mobile
    - JWT authentication: Leave **unchecked** (IMPORTANT)
 5. Click "Create API Key"
 6. Copy the generated API key


## Step 3: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
yarn start
```

## Step 4: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
yarn android
```

### For iOS

```bash
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.


## Congratulations! :tada:

You've successfully run the Iterable Example App. :partying_face:


# Troubleshooting

## Error: `Could not find gem 'cocoapods (>= 1.13, != 1.15.0, != 1.15.1)' in locally installed gems`

To fix, run the following in the _example app directory_:

```bash
bundle install
```

## Error: `Signing for 'ReactNativeSdkExample' requires a development team.  Select a development team in the Signing & Capabilities Editor`

- Open XCode
- Go to 'Signing & Capabilities'
- Choose a team
- Stop your application, then rerun

If you are still experiencing issues, try deleting `ios/.xcode.env.local`

## Error: `/Library/Ruby/Gems/XYZ does not have write permissions` or `/usr/local/lib does not have write permissions`

This is a common issue with using ruby on Macs.  You can modify the read/write
access of the computers Ruby folder, but a better (and safer) way is to use
`rbenv` and [`homebrew`](https://brew.sh/) by doing the following:

1. **Install/update homebrew**
If you have homebrew, update it by running: `brew update && brew upgrade`.
If you do not have homebrew, follow the [installation
instructions](https://brew.sh/).

2. **Install `rbenv` and `ruby-build`**
```bash
# Uninstall ruby (you can try skipping this step if you have concerns)
brew uninstall --ignore-dependencies ruby
# Install `rbenv` and `ruby-build`
brew install rbenv ruby-build
# Install the correct ruby version, eg: 3.3.6
rbenv install 3.3.6
# Default to using this ruby version
rbenv global 3.3.6
```

3. **Tell your computer to use `rbenv`**
Add the following to the top of your `.zshrc` or `.bash_profile`:
```zsh
eval "$(rbenv init -)"
```

4. **Reload `.zshrc` or `.bash_profile`**
Run the following in your terminal:
```bash
# If using zsh
source ~/.zshrc
# If using bash
source ~/.bash_profile
```

## Error: `bad interpreter: No such file or directory` on `pod install`
Reinstall cocoapods by doing the following:
```bash
# Uninstall current version of cocoapods
brew uninstall cocoapods
# Install a fresh version of cocoapods
brew install cocoapods
# Recreate link to cocoapods
brew unlink cocoapods && brew link cocoapods
```

Run `pod install` again, and it should work

## Other
If things are not working and you are stumped as to why, try running the
following in the _example app directory_:

```bash
npx react-native doctor
```

This will give you information about what react native needs in order to run,
and whether it is accessible to the app.

Take a look at the OS you are trying to run.  Make sure that everything has been
installed and that the necessary items have been added to your `PATH`.