package com.example.myapplication;

import android.os.Bundle;
import androidx.activity.ComponentActivity;
import androidx.activity.compose.ComponentActivityKt;
import androidx.compose.runtime.CompositionContext;
import kotlin.Metadata;
import kotlin.jvm.functions.Function0;
import org.jetbrains.annotations.Nullable;
import org.devio.rn.splashscreen.SplashScreen;
import android.os.Bundle;

 @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
    }


@Metadata(
   mv = {1, 8, 0},
   k = 1,
   d1 = {"\u0000\u0018\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0010\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\u0018\u00002\u00020\u0001B\u0005¢\u0006\u0002\u0010\u0002J\u0012\u0010\u0003\u001a\u00020\u00042\b\u0010\u0005\u001a\u0004\u0018\u00010\u0006H\u0014¨\u0006\u0007"},
   d2 = {"Lcom/example/myapplication/MainActivity;", "Landroidx/activity/ComponentActivity;", "()V", "onCreate", "", "savedInstanceState", "Landroid/os/Bundle;", "app_debug"}
)
public final class MainActivity extends ComponentActivity {
   protected void onCreate(@Nullable Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      ComponentActivityKt.setContent$default(this, (CompositionContext)null, (Function0)null.INSTANCE, 1, (Object)null);
   }
}

import androidx.compose.material3.TextKt;
import androidx.compose.runtime.Composable;
import androidx.compose.ui.Modifier;
import androidx.compose.ui.text.TextStyle;
import androidx.compose.ui.text.font.FontFamily;
import androidx.compose.ui.text.font.FontStyle;
import androidx.compose.ui.text.font.FontWeight;
import androidx.compose.ui.text.style.TextAlign;
import androidx.compose.ui.text.style.TextDecoration;
import androidx.compose.ui.tooling.preview.Preview;
import com.example.myapplication.ui.theme.ThemeKt;
import kotlin.Metadata;
import kotlin.jvm.functions.Function0;
import kotlin.jvm.functions.Function1;
import kotlin.jvm.internal.Intrinsics;
import org.jetbrains.annotations.NotNull;

@Metadata(
   mv = {1, 8, 0},
   k = 2,
   d1 = {"\u0000\u0016\n\u0000\n\u0002\u0010\u0002\n\u0000\n\u0002\u0010\u000e\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\u001a\u001a\u0010\u0000\u001a\u00020\u00012\u0006\u0010\u0002\u001a\u00020\u00032\b\b\u0002\u0010\u0004\u001a\u00020\u0005H\u0007\u001a\b\u0010\u0006\u001a\u00020\u0001H\u0007¨\u0006\u0007"},
   d2 = {"Greeting", "", "name", "", "modifier", "Landroidx/compose/ui/Modifier;", "GreetingPreview", "app_debug"}
)
public final class MainActivityKt {
   @Composable
   public static final void Greeting(@NotNull String name, @NotNull Modifier modifier) {
      Intrinsics.checkNotNullParameter(name, "name");
      Intrinsics.checkNotNullParameter(modifier, "modifier");
      TextKt.Text-Vh6c2nE$default("Hello " + name + '!', modifier, 0L, 0L, (FontStyle)null, (FontWeight)null, (FontFamily)null, 0L, (TextDecoration)null, (TextAlign)null, 0L, 0, false, 0, (Function1)null, (TextStyle)null, 65532, (Object)null);
   }

   // $FF: synthetic method
   public static void Greeting$default(String var0, Modifier var1, int var2, Object var3) {
      if ((var2 & 2) != 0) {
         var1 = (Modifier)Modifier.Companion;
      }

      Greeting(var0, var1);
   }

   @Preview(
      showBackground = true
   )
   @Composable
   public static final void GreetingPreview() {
      ThemeKt.MyApplicationTheme$default(false, false, (Function0)null.INSTANCE, 3, (Object)null);
   }
}
