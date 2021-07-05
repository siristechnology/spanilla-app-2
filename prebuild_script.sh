

TIME_STAMP=$(date +%s)
BUILD_GRADLE=./android/app/build.gradle

sed -i '' -e 's/versionCode .*$/versionCode '$TIME_STAMP'/' $BUILD_GRADLE

sed -i '' -e 's/versionName "[^"]*"/versionName "'$TIME_STAMP'"/' $BUILD_GRADLE
