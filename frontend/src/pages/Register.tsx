import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/authService';

interface RegisterForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
}

const Register: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const password = watch('password');

  const onSubmit = async (data: RegisterForm) => {
    setError('');
    setLoading(true);

    try {
      const response = await authService.register({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
      });
      
      login(response.token, {
        id: response.id,
        fullName: response.fullName,
        email: response.email,
      });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng ký tài khoản
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Hoặc{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              đăng nhập nếu đã có tài khoản
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="card">
            {error && (
              <div className="mb-4 p-3 bg-danger-50 border border-danger-200 rounded-lg text-danger-700">
                {error}
              </div>
            )}
            
            <div className="form-group">
              <label className="form-label">Họ và tên</label>
              <input
                type="text"
                {...register('fullName', {
                  required: 'Họ và tên là bắt buộc',
                  minLength: {
                    value: 2,
                    message: 'Họ và tên phải có ít nhất 2 ký tự',
                  },
                })}
                className="input"
                placeholder="Nhập họ và tên"
              />
              {errors.fullName && <p className="form-error">{errors.fullName.message}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email là bắt buộc',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email không hợp lệ',
                  },
                })}
                className="input"
                placeholder="Nhập email của bạn"
              />
              {errors.email && <p className="form-error">{errors.email.message}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Mật khẩu</label>
              <input
                type="password"
                {...register('password', {
                  required: 'Mật khẩu là bắt buộc',
                  minLength: {
                    value: 6,
                    message: 'Mật khẩu phải có ít nhất 6 ký tự',
                  },
                })}
                className="input"
                placeholder="Nhập mật khẩu"
              />
              {errors.password && <p className="form-error">{errors.password.message}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Xác nhận mật khẩu</label>
              <input
                type="password"
                {...register('confirmPassword', {
                  required: 'Xác nhận mật khẩu là bắt buộc',
                  validate: (value) => value === password || 'Mật khẩu không khớp',
                })}
                className="input"
                placeholder="Nhập lại mật khẩu"
              />
              {errors.confirmPassword && <p className="form-error">{errors.confirmPassword.message}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Số điện thoại</label>
              <input
                type="tel"
                {...register('phoneNumber')}
                className="input"
                placeholder="Nhập số điện thoại (tùy chọn)"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Ngày sinh</label>
              <input
                type="date"
                {...register('dateOfBirth')}
                className="input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Giới tính</label>
              <select {...register('gender')} className="input">
                <option value="">Chọn giới tính</option>
                <option value="MALE">Nam</option>
                <option value="FEMALE">Nữ</option>
                <option value="OTHER">Khác</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary"
            >
              {loading ? 'Đang đăng ký...' : 'Đăng ký'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
