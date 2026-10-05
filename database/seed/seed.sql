INSERT OR IGNORE INTO vip_plans(id,name,price,duration_days,features_json) VALUES
('vip-basic','VIP Basic',99000,30,'{"queue_priority":true,"monthly_jobs":100}'),
('vip-pro','VIP Pro',199000,30,'{"queue_priority":true,"monthly_jobs":500,"burnin":true}');
