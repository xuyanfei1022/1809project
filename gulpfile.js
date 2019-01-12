var gulp = require('gulp');
var sass = require('gulp-sass');


//html
gulp.task('copy-html', async()=>{
      gulp.src('*.html')
     .pipe(gulp.dest('C:\\phpStudy\\WWW\\web1808\\skyworth'));
 });

// font
gulp.task("copy-font",async()=>{
    gulp.src('font/**')
    .pipe(gulp.dest('C:\\phpStudy\\WWW\\web1808\\skyworth\\font'));
});


//img
gulp.task('copy-img',async()=>{
    gulp.src('img/*.{jpg,png,tmp,gif}')
    .pipe(gulp.dest('C:\\phpStudy\\WWW\\web1808\\skyworth\\img'));
});


//放在本地css
gulp.task('copy-scss', async()=>{
   return gulp.src('scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'));
});

//放在www css
gulp.task('copy-css', async()=>{
    return gulp.src('css/*.css')
    //  .pipe(sass())
     .pipe(gulp.dest('C:\\phpStudy\\WWW\\web1808\\skyworth\\css'));
 });


//js
gulp.task('copy-js',async()=>{
    gulp.src('js/*.js')
    .pipe(gulp.dest('C:\\phpStudy\\WWW\\web1808\\skyworth\\js'));
});



//php
gulp.task('copy-php',async()=>{
    gulp.src('php/*.php')
    .pipe(gulp.dest('C:\\phpStudy\\WWW\\web1808\\skyworth\\php'));
});



gulp.task("watchall",async()=>{
    //监视所有文件是否有变化，如果有变化，就执行任务：copy
    gulp.watch("*.html",gulp.series("copy-html"));
    gulp.watch("font/**",gulp.series("copy-font"));
    gulp.watch('img/*.{jpg,png,tmp,gif}',gulp.series("copy-img"));
    gulp.watch('js/*.js',gulp.series("copy-js"));
    gulp.watch('css/*.css',gulp.series("copy-css"));
    gulp.watch('php/*.php',gulp.series("copy-php"));
    gulp.watch('scss/*.scss',gulp.series("copy-scss"));
    
});

