
module.exports = {
    apps: [
        {
            name: 'primary',
            script: 'dist/src/main.js',
            instances: 1,
            exec_mode: 'cluster',
            log_date_format: "YYYY-MM-DD HH:mm Z",
            log_file: `./logs/combined.log`,
            env: {
                APP_NAME: 'primary',
            },
        },
        {
            name: 'replica',
            script: 'dist/src/main.js',
            instances: 3,
            exec_mode: 'cluster',
            log_date_format: "YYYY-MM-DD HH:mm Z",
            log_file: `./logs/combined.log`,
            env: {
                APP_NAME: 'replica',
            },
        }
    ]
}