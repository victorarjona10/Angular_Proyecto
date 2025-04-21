// login.component.ts
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = 'pol@example.com';
  password: string = '1234';

  constructor(private apiService: ApiService, private router: Router) 
  {
    
      // 添加消息监听（仅用于Google登录）
    window.addEventListener('message', this.handleGoogleLoginMessage.bind(this));
    
  }

  
  login() {
    this.apiService.Login(this.email, this.password).subscribe({
      next: (res) => {
        console.log('Login correcte', res);
        localStorage.setItem('token', res.admin.token); 
        console.log('Token guardat:', res.admin.token);
        localStorage.setItem('refresh_token', res.admin.refreshToken);
        console.log('Refresh Token guardat:', res.admin.refreshToken);
        localStorage.setItem('email', this.email);
        alert('Login correcte!');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error al login', err);
        alert('Usuari o contrasenya incorrectes!');
      }
    });
  }

  private handleGoogleLoginMessage(event: MessageEvent) {
    // 安全验证：确保消息来自Google回调页面
    if (event.origin !== 'http://localhost:4000') return;
    
    if (event.data.token) {
      // 存储token并跳转
      localStorage.setItem('token', event.data.token);
      if (event.data.user) {
        localStorage.setItem('user', JSON.stringify(event.data.user));
      }
      this.router.navigate(['/home']);
    }
  }
  
  // 修改loginWithGoogle方法
  loginWithGoogle() {
    const googleAuthUrl = 'http://localhost:4000/api/users/auth/google';
    const width = 500;
    const height = 600;
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;
    
    // 打开Google登录窗口
    const googleAuthWindow = window.open(
      googleAuthUrl,
      'googleAuth',
      `width=${width},height=${height},left=${left},top=${top}`
    );
  
    // 添加窗口关闭检测
    const checkWindowClosed = setInterval(() => {
      if (googleAuthWindow && googleAuthWindow.closed) {
        clearInterval(checkWindowClosed);
        // 可以在这里添加一些处理逻辑
      }
    }, 500);
  }

  // 清理监听器
  ngOnDestroy() {
    window.removeEventListener('message', this.handleGoogleLoginMessage);
  }


  signup() {
    this.router.navigate(['/signup']); 
  }
}