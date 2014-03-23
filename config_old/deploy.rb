require 'capistrano_colors'
#require 'bundler/capistrano'

# Configurando o servidor
set :domain, "rupy.com.br"
set :application, "rupybrazil2013"
set :user, "railsapps"
set :use_sudo, false
set :deploy_to, "/home/#{user}/#{application}"

# Configurando o repositório
server domain, :app, :web, :db, :primary => true
set :repository,  "git@github.com:designa/13.rupy.com.br.git"
set :scm, :git
set :keep_releases, 5
ssh_options[:forward_agent] = false
set :normalize_asset_timestamps, false

# Deploy
namespace :deploy do
  task :start do
    run "sudo /etc/init.d/apache2 start"
  end

  task :stop do
    run "sudo /etc/init.d/apache2 stop"
  end

  task :restart, :roles => :app, :except => { :no_release => true } do
    run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
    run "sudo /etc/init.d/apache2 restart"
  end
end
