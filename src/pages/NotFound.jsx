import { Link } from 'react-router-dom';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center font-mono p-8"
            style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>

            <div className="text-center max-w-lg">
                {/* Error Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="p-6 rounded-full"
                        style={{
                            backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)',
                            border: '2px solid var(--color-primary)'
                        }}>
                        <AlertTriangle className="w-16 h-16" style={{ color: 'var(--color-primary)' }} />
                    </div>
                </div>

                {/* Error Code */}
                <h1 className="text-6xl md:text-8xl font-bold mb-4"
                    style={{ color: 'var(--color-primary)' }}>
                    404
                </h1>

                {/* Error Message */}
                <div className="mb-8 p-4"
                    style={{
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'color-mix(in srgb, var(--color-primary) 5%, transparent)'
                    }}>
                    <p className="text-lg font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                        [ ERROR: PAGE_NOT_FOUND ]
                    </p>
                    <p style={{ color: 'var(--color-text-muted)' }}>
            // The requested resource could not be located on this server.
                    </p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 px-6 py-3 font-bold uppercase tracking-wider transition-all"
                        style={{
                            border: '1px solid var(--color-primary)',
                            color: 'var(--color-primary)',
                            backgroundColor: 'transparent'
                        }}
                    >
                        <Home className="w-5 h-5" />
                        Return Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center justify-center gap-2 px-6 py-3 font-bold uppercase tracking-wider transition-all"
                        style={{
                            border: '1px solid var(--color-border)',
                            color: 'var(--color-text-muted)',
                            backgroundColor: 'transparent'
                        }}
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back
                    </button>
                </div>

                {/* Status Footer */}
                <div className="mt-12 text-xs tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                    <span className="animate-pulse inline-block w-2 h-2 rounded-full mr-2"
                        style={{ backgroundColor: 'var(--color-primary)' }}></span>
                    SYSTEM_ACTIVE // ERROR_LOGGED
                </div>
            </div>
        </div>
    );
};

export default NotFound;
