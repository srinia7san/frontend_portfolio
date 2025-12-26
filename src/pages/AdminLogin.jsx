import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle } from 'lucide-react';
import { adminLogin } from '../api/api';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await adminLogin({ username, password });
            if (response.data.token) {
                localStorage.setItem('adminToken', response.data.token);
                navigate('/admin');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center font-mono p-4"
            style={{ backgroundColor: 'var(--color-bg)' }}>
            <div className="w-full max-w-md p-8 relative"
                style={{
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    boxShadow: '0 0 50px color-mix(in srgb, var(--color-primary) 10%, transparent)'
                }}>

                {/* Corner Decorations */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2"
                    style={{ borderColor: 'var(--color-primary)' }}></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2"
                    style={{ borderColor: 'var(--color-primary)' }}></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2"
                    style={{ borderColor: 'var(--color-primary)' }}></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2"
                    style={{ borderColor: 'var(--color-primary)' }}></div>

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-block p-4 mb-4"
                        style={{
                            backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)',
                            border: '1px solid var(--color-border)'
                        }}>
                        <Lock className="w-8 h-8" style={{ color: 'var(--color-primary)' }} />
                    </div>
                    <h1 className="text-2xl font-bold tracking-wider" style={{ color: 'var(--color-text)' }}>
                        [ ADMIN_ACCESS ]
                    </h1>
                    <p className="text-sm mt-2" style={{ color: 'var(--color-text-muted)' }}>
            // Authentication required
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="flex items-center gap-3 p-4 mb-6"
                        style={{
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid #ef4444',
                            color: '#ef4444'
                        }}>
                        <AlertCircle className="w-5 h-5" />
                        <span className="text-sm">{error}</span>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider"
                            style={{ color: 'var(--color-text-muted)' }}>
                            &gt; Username
                        </label>
                        <div className="relative">
                            <User className="absolute left-4 top-3 w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full py-3 pl-12 pr-4 font-mono focus:outline-none"
                                style={{
                                    backgroundColor: 'var(--color-bg)',
                                    border: '1px solid var(--color-border)',
                                    color: 'var(--color-text)'
                                }}
                                placeholder="admin"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider"
                            style={{ color: 'var(--color-text-muted)' }}>
                            &gt; Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-3 w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full py-3 pl-12 pr-4 font-mono focus:outline-none"
                                style={{
                                    backgroundColor: 'var(--color-bg)',
                                    border: '1px solid var(--color-border)',
                                    color: 'var(--color-text)'
                                }}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 font-bold uppercase tracking-wider transition-all ${loading ? 'opacity-50' : ''}`}
                        style={{
                            border: '1px solid var(--color-primary)',
                            color: 'var(--color-primary)',
                            backgroundColor: 'transparent'
                        }}
                    >
                        {loading ? '[ AUTHENTICATING... ]' : '[ LOGIN ]'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
