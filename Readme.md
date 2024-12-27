# JQBS-master-ionic

1. OPEN src -> theme -> variables.scss
   -> line : 36 --ion-color-main: (change theme color)

2. OPEN resources -> icon.png (1024 \* 1024 )
   command for icons
   run command in terminal : ionic cordova resources -g

3. OPEN src -> assets -> images -> svg -> icon.png (1024 \* 1024 )

4. OPEN config.xml -> change
   pacakage name :-> id="com.qrtech.jeevandeep"
   app name :-> <name>JQBS</name>

5. OPEN index.html -> change
   <title>JQBS</title>

6. social link (facebook , insta)
   src -> pages -> new_pages -> profile -> profile.page.html

change:-> "#" place link inside

<a href="#"><ion-icon class="social_icon" name="logo-facebook"></ion-icon></a>

---

for MOBILE BUILD home page canvas add this and for web remove this

## style="position: relative; height: 255px; width: 300px"

## For ANDROID BUILD

ionic cordova build android
dont forget to update version name & version code

---

// "rxjs": "~6.6.0",
"@ionic-native/barcode-scanner": "^5.36.0",

## For IOS BUILD

ionic cordova build ios
dont forget to update build number & version

ionic cordova resources -g
ionic cordova plugin save
ionic cordova platform rm ios
ionic cordova build ios

ionic cordova resources -g
ionic cordova plugin save
ionic cordova platform rm android
ionic cordova build android

// app name changes pages
EX = app="JQBS | JEEVANDEEP"
{{this.app}}

---

# razorpay change key

chaptername
enotes
sub-video-list

// import androidx.core.app.ActivityCompat;

-----android build------
in android studio ----

dependencies {
"implementation" <--- (name:'barcodescanner-release-2.1.5', ext:'aar')
}
Kuttys tuition
Color Code - #000166
Class Id - 2322
res > drawable > ic_cdv_splashscreen.xml

<path
    android:fillColor="#fff"
    android:fillType="evenOdd"
    android:pathData="M425.22,310.86z" />

    config.xml
    <preference name="SplashScreen" value="none" />

build.gradle(module:app)
192 line

android {
defaultConfig {
multiDexEnabled true

min 21
target 33
compile 33

# dont allow inspect index.html body

<script>
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    function ctrlShiftKey(e, keyCode) {
      return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
    }
    document.onkeydown = (e) => {
      if (
        event.keyCode === 123 ||
        ctrlShiftKey(e, 'I') ||
        ctrlShiftKey(e, 'J') ||
        ctrlShiftKey(e, 'C') ||
        (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
      )
        return false;
    };
  </script>
