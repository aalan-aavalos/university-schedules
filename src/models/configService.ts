import { ConfigProps } from '@/interfaces';

export class ConfigService {
    private config: ConfigProps

    constructor(config: ConfigProps) {
        this.config = config
    }

    public setConfig(config: ConfigProps) {
        this.config = config
    }

    public getConfig(): ConfigProps {
        return this.config
    }
}